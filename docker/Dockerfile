###############################################################################
# Минимальный образ YottaDB: только MUMPS + встроенный M Web Server (%ydbwebreq)
#
# Намеренно НЕ ставится: Octo, POSIX, AIM, libcurl, GUI, encryption и прочие
# плагины. Только ядро YottaDB (MUMPS) и Web-сервер.
#
# Запуск (порт на веб-сервер + проброс каталогов с рутинами и БД):
#   docker run --rm -p 9080:9080 \
#     -v "$PWD/rou:/rou" \
#     -v "$PWD/data:/data" \
#     yottadb-mumps-web
#
# /data  — каталог с файлами БД (yottadb.dat, yottadb.gld)
# /rou   — каталог, сюда кладутся ваши .m-рутины (их ищет %ydbwebreq)
###############################################################################

# ============================ Этап 1: сборка ================================
FROM debian:stable-slim AS builder

# Версию YottaDB можно переопределить при сборке:
#   docker build --build-arg YDB_VERSION=r2.06 .
# Зафиксированная версия => воспроизводимая сборка.
ARG YDB_VERSION=r2.06

ENV DEBIAN_FRONTEND=noninteractive

# Инструменты, нужные ydbinstall.sh и сборке Web-сервера (cmake/make/gcc),
# а также утилиты проверки зависимостей (file/binutils).
# ВАЖНО: libicu-dev обязательно уже здесь — ydbinstall.sh проверяет наличие
# libicuio.so до установки и прерывается без него.
RUN apt-get update && apt-get install -y --no-install-recommends \
        clang \
        wget \
        ca-certificates \
        file \
        binutils \
        libelf-dev \
        libicu-dev \
        cmake \
        git \
        make \
        pkg-config \
        gcc \
        libc6-dev \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /tmp/install

# Ставим ТОЛЬКО ядро YottaDB с UTF-8 и Web Server.
#   --webserver  — плагин M Web Server (%ydbwebreq)
#   --utf8       — UTF-8 режим (нужен веб-серверу для JSON и имён)
#   --nocopyenv  — не копировать ydb_env_set и т.п.
#   --nocopyexec — не копировать ydb/gtm скрипты в /usr/local/bin
# Версия как итоговый аргумент -> установка в /usr/local/lib/yottadb/<ver>
RUN wget -q "https://gitlab.com/YottaDB/DB/YDB/raw/master/sr_unix/ydbinstall.sh" -O ydbinstall.sh \
    && chmod +x ydbinstall.sh \
    && ./ydbinstall.sh --verbose --utf8 --webserver --nocopyenv --nocopyexec --posix "${YDB_VERSION}" \
    && rm -rf /tmp/install

# =========================== Этап 2: рантайм ================================
FROM debian:stable-slim

ENV DEBIAN_FRONTEND=noninteractive

# Рантайм-зависимости ядра и веб-сервера:
#   libicu / libelf1 — нужны ядру YottaDB
#   zlib1g           — gzip и общие нужды
#   libsodium23      — режимы авторизации веб-сервера (--auth-*)
#   procps / curl    — для HEALTHCHECK
RUN apt-get update && apt-get install -y --no-install-recommends \
        libicu76 \
        libelf1 \
        zlib1g \
        libsodium23 \
        procps \
        curl \
    && rm -rf /var/lib/apt/lists/*

# Копируем установленный YottaDB из builder'а
COPY --from=builder /usr/local/lib/yottadb /usr/local/lib/yottadb

# YottaDB при загрузке ищет unversioned libicuio.so, а в Debian ICU ставится
# как libicuio.so.<ver>. Создаём симлинк на актуальную версию ICU и вычисляем
# её номер для ydb_icu_version (ICU в Debian собран с symbol-renaming, поэтому
# без этой переменной YottaDB не находит u_getVersion).
RUN set -eux; \
    lib="$(ls /usr/lib/*/libicuio.so.* 2>/dev/null | head -n1)"; \
    if [ -n "$lib" ]; then \
        ln -sf "$lib" "$(dirname "$lib")/libicuio.so"; \
        ldconfig; \
        echo "Detected ICU library: $lib"; \
    fi

# Надёжный симлинк current -> версионный каталог rX.YY
# (берём первый, если каталогов r* несколько)
RUN cd /usr/local/lib/yottadb \
    && ver="$(ls -d r* | head -n1)" \
    && ln -sfn "$ver" current

# ----- Базовое окружение YottaDB -----
ENV ydb_dist=/usr/local/lib/yottadb/current
ENV gtm_dist=/usr/local/lib/yottadb/current
# UTF-8 режим — согласован с --utf8 при установке.
# Для UTF-8 режима YottaDB требуется UTF-8 локаль, иначе ошибка
# %YDB-E-NONUTF8LOCALE. C.UTF-8 есть в Debian по умолчанию.
ENV ydb_chset=UTF-8
ENV LANG=C.UTF-8
ENV LC_ALL=C.UTF-8
# Без этой переменной YottaDB не находит символы ICU в сборке Debian
# (ICU собран с symbol-renaming). Значение подставляется при сборке.
ENV ydb_icu_version=76
# Каталог БД, пробрасываемый с хоста
ENV ydb_dir=/data
# Пути поиска routine'ов. ВАЖНО: плагин веб-сервера (%ydbwebreq) и утилиты ядра
# упакованы в разделяемые библиотеки .so — их надо указывать ФАЙЛАМИ, а не
# каталогами. Порядок: пользовательские рутины /rou -> база ->
# util-библиотека ядра (UTF-8 вариант!) -> плагин веб-сервера.
ENV ydb_routines="/rou/obj*(/rou/src) /rou $ydb_dist/utf8/libyottadbutil.so $ydb_dist/plugin/o/utf8/_ydbmwebserver.so $ydb_dist"
# Путь к библиотеке ядра (--nocopyexec не прописывает окружение)
ENV LD_LIBRARY_PATH=$ydb_dist
ENV PATH=$ydb_dist:$PATH

# ----- Пути к подключаемым локальным каталогам -----
# Файл глобального каталога БД (создаётся автоматически при первом запуске)
ENV ydb_gbldir=/data/yottadb.gld
# Файл данных БД
ENV ydb_dat=/data/yottadb.dat
# Порт веб-сервера (переопределяется при запуске: -e YDB_WEB_PORT=...)
ENV YDB_WEB_PORT=9080

# Две папки, которые пробрасываются с хоста: БД и рутины
VOLUME ["/data", "/rou"]

WORKDIR /rou
EXPOSE 9080

# Проверка живости: веб-сервер должен отвечать по HTTP на порт
HEALTHCHECK --interval=15s --timeout=5s --start-period=10s --retries=3 \
    CMD curl -fsS "http://127.0.0.1:${YDB_WEB_PORT}/" >/dev/null || exit 1

# Автономный ENTRYPOINT:
#   1) при первом запуске создаёт структуру БД в /data;
#   2) запускает M Web Server на порту $YDB_WEB_PORT.
# Вынесен в отдельный скрипт для читаемости и отладки.
COPY docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

ENTRYPOINT ["/usr/local/bin/docker-entrypoint.sh"]
