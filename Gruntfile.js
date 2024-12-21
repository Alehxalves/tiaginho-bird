/*global module:false*/
module.exports = function (grunt) {
  var sourceFiles = [
    "js/game.js",
    "js/entities/entities.js",
    "js/entities/HUD.js",
    "js/screens/title.js",
    "js/screens/play.js",
    "js/screens/gameover.js",
  ];

  // Project configuration.
  grunt.loadNpmTasks("grunt-contrib-copy");
  grunt.initConfig({
    copy: {
      main: {
        files: [
          {
            expand: true,
            cwd: "build/", // O diretório onde o Grunt gera os arquivos
            src: ["clumsy-min.js"], // Arquivo gerado
            dest: "public/", // Diretório de saída esperado pela Vercel
          },
        ],
      },
    },
    uglify: {
      options: {
        report: "min",
        preserveComments: "some",
      },
      dist: {
        files: {
          "public/clumsy-min.js": [sourceFiles], // Mudado para 'public'
        },
      },
    },

    jshint: {
      options: {
        jshintrc: ".jshintrc",
      },

      beforeConcat: {
        files: {
          src: sourceFiles,
        },
      },

      afterConcat: {
        files: {
          src: [sourceFiles],
        },
      },
    },

    connect: {
      root: {
        options: {
          port: process.env.PORT || 8001,
          keepalive: true,
          host: "*",
        },
      },
    },

    clean: {
      dist: ["build/clumsy-min.js"],
    },
  });

  grunt.loadNpmTasks("grunt-contrib-uglify");
  grunt.loadNpmTasks("grunt-contrib-jshint");
  grunt.loadNpmTasks("grunt-contrib-clean");
  grunt.loadNpmTasks("grunt-contrib-connect");

  // Default task.
  grunt.registerTask("default", ["uglify", "copy"]);
  grunt.registerTask("lint", [
    "jshint:beforeConcat",
    "concat",
    "jshint:afterConcat",
  ]);
};
