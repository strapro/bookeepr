FROM alexsuch/angular-cli:1.6.8-chromium

MAINTAINER strapro <strapro@gmail.com>

ENV HOME=/usr/src

RUN mkdir $HOME

WORKDIR $HOME