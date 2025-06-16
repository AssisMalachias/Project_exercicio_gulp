const gulp = require('gulp');

const sass = require('gulp-sass')(require('sass'));

const imagemin = require('gulp-imagemin');
const changed = require('gulp-changed');

const uglify = require('gulp-uglify');

const paths = {
    scss: {
         src:'./src/scss/**/*.scss',
         dest:'./build/css/'
    },
    image: {
        src:'./src/image/**/*',
        dest:'./build/image/'
    },
    js: {
        src:'./src/js/**/*.js',
        dest:'./build/js'
    }
};

// Tarefa: Compilar SASS
function compilaSass() {
     return gulp.src(paths.scss.src)
        .pipe(sass({ outputStyle: 'compressed'})).on('error', sass.logError)
        .pipe(gulp.dest(paths.scss.dest));
}

// Tarefa: Comprimir imagens
function comprimeImagens() {
     return gulp.src(paths.image.src)
        .pipe(changed(paths.image.dest))
        .pipe(imagemin())
        .pipe(gulp.dest(paths.image.dest));
}

// Tarefa: Minificar JS
function minificaJs(){
    return gulp.src(paths.js.src)
    .pipe(uglify())
    .pipe(gulp.dest(paths.js.dest));
}

// Exporta as tarefas individualmente
exports.sass = compilaSass;
exports.imagem = comprimeImagens;
exports.js = minificaJs;

// Tarefa padraao (executa todas)
exports.default = gulp.parallel(compilaSass, comprimeImagens, minificaJs);