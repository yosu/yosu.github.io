---
layout: post
title:  "JekyllでLiveReload"
tags: jekyll grunt livereload
---

[Jekyll](http://jekyllrb.com/) でブログを書くのに[LiveReload](http://livereload.com/)を利用しようとしましたがなかなかうまくいかず、試行錯誤してやり方が落ち着いたので紹介します。

## GruntでLiveReload

いろいろ試した結果、`jekyll serve` とGruntのwatchを組み合わせる方法に落ち着きました。

1. jekyll serveで編集監視、サイト生成（バージョン2.4.0未満の場合は--watchオプションを追加）
2. Gruntのwatchで_site以下を監視し、LiveReload

Gruntfile.jsは以下の通りです。
Gruntのタスクで `jekyll serve` も実行するため、grunt-shell, grunt-concurrentを利用しています。

```javascript
// Gruntfile.js
module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        shell: {
            jekyllServe: {
                command: 'jekyll serve --drafts'
            }
        },
        watch: {
            files: [
                '_site/*'
            ],
            options: {
                livereload: true
            }
        },
        concurrent: {
            target: {
                tasks: ['shell:jekyllServe', 'watch'],
                options: {
                    logConcurrentOutput: true
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-concurrent');

    grunt.registerTask('default', ['concurrent:target']);
};
```


### うまくいかなかった方法

最初に[Guard](https://github.com/guard/guard)（guard-jekyll-plus, guard-livereload）でやってみましたがどうもうまく動かすことができませんでした。（バージョンの問題？）

次に、「[Jekyll build and serve using Grunt](http://blog.parkji.co.uk/2013/08/12/jekyll-build-and-serve-using-grunt.html) 」で紹介されているやり方試してみました。

こちらはGruntで編集ファイルをwatchして、build, serveするのですが、以前のserveが残ったままになりポートが利用中でエラーになってしまいました。（毎回ビルドするので遅いという問題もあります）