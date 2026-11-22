#!/bin/sh
###############################################################################
# Entrypoint минимального образа YottaDB (MUMPS + M Web Server).
#
# При первом запуске создаёт глобальный каталог (.gld) и файл БД (.dat)
# в проброшенном каталоге /data, затем запускает веб-сервер на порту
# $YDB_WEB_PORT. Инициализация идемпотентна: повторные запуски не трогают БД.
# Рутины (пользовательские .m-файлы) читаются из каталога /rou.
###############################################################################
set -e

: "${ydb_dist:?ydb_dist не задан}"
: "${ydb_gbldir:?ydb_gbldir не задан}"
: "${ydb_dat:?ydb_dat не задан}"
YDB_WEB_PORT="${YDB_WEB_PORT:-9080}"

# Локаль/режим, необходимые для UTF-8 работы YottaDB
export LANG="${LANG:-C.UTF-8}"
export LC_ALL="${LC_ALL:-C.UTF-8}"
export ydb_chset="${ydb_chset:-UTF-8}"

DB_DIR="$(dirname "$ydb_gbldir")"
mkdir -p "$DB_DIR" /rou

# 1) Если .gld уже есть — БД инициализирована, ничего не делаем.
if [ -f "$ydb_gbldir" ]; then
    echo "Используется существующая БД: $ydb_gbldir"
else
    echo "Инициализация БД YottaDB в каталоге $DB_DIR ..."

    # 1a) Создаём глобальный каталог (.gld) через GDE, указав путь к .dat.
    #     GDE берёт определения по умолчанию из $ydb_dist/gdedefaults.
    ( printf 'change -segment default -file_name=%s\n' "$ydb_dat"; printf 'exit\n' ) \
        | "$ydb_dist/yottadb" -run GDE >/dev/null

    # 1b) Создаём сам файл базы данных для региона DEFAULT по .gld.
    "$ydb_dist/mupip" create -region DEFAULT

    echo "БД создана: $ydb_gbldir -> $ydb_dat"
fi

# 2) Предупреждение, если каталог с рутинами пуст.
if [ -z "$(ls -A /rou 2>/dev/null)" ]; then
    echo "ВНИМАНИЕ: каталог /rou с рутинами пуст. Смонтируйте туда ваши .m-файлы."
fi

# 3) Запуск M Web Server. exec — чтобы сигналы (SIGTERM) доходили до процесса.
echo "Запуск M Web Server на порту ${YDB_WEB_PORT} ..."
exec "$ydb_dist/yottadb" -run start^%ydbwebreq --port "${YDB_WEB_PORT}"
