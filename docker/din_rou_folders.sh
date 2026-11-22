# Базовый каталог проекта
APP_DIR="/rou"

# Собираем сам каталог src и все его подкаталоги в одну строку через пробел
SRC_DIRS=$(find "$APP_DIR/src" -type d | tr '\n' ' ')

# Формируем ydb_routines (с поддержкой авто-перекомпиляции через *)
export ydb_routines="$APP_DIR/obj*($SRC_DIRS) /rou $ydb_dist/utf8/libyottadbutil.so $ydb_dist/plugin/o/utf8/_ydbmwebserver.so $ydb_dist"
