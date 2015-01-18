---
layout: post
title:  "Docker Meetup Tokyo #4 に行ってきました"
tags: docker
---

[Docker Meetup Tokyo #4](http://connpass.com/event/10318/)に行ってきました。
運良く補欠枠で参加することができましたのでレポートしたいと思います。

<img alt="Docker Meetup Tokyo #4" src="https://connpass-tokyo.s3.amazonaws.com/thumbs/89/fe/89fef31788a8303a59530c568d4bda7e.png" width="400" />


全体の内容や資料については[d4-1977さんのDocker Meetup Tokyo 第4回に参加しました #dockerjp](http://d4-1977.hatenablog.com/entry/2015/01/17/232517)が詳しいので、ここでは自分が思ったことをまとめたいと思います。


## アプリケーションからサービスへ

Dockerはアプリケーションのポータビリティをもたらしてくれました。
アプリケーションをデプロイし、それをサービスとして運用するにあたってはさらにオーケストレーションや死活監視といった周辺の整備が必要になってきます。

このあたりを支える技術としてCoreOSやKubernates（通称：キュゥべえ）が紹介されていました。

<img alt="CoreOS" src="/images/2015/01/18/coreos-horiz.png" width="200" />
<img alt="Kubernates" src="/images/2015/01/18/kubernates.png" width="100" />

- [@deeeet](https://twitter.com/deeeet)さん [CoreOSの基礎/CoreOSに期待すること](https://speakerdeck.com/tcnksm/coreoskurasutanidockerkontenawodepuroi-number-dockerjp)
- [@yugui](https://twitter.com/yugui)さん Kubernetesの機能とデモ、開発体制について

特に、KubernatesはGoogleのコンテナ運用の経験をふまえて作られているということが大きくて、
Service, Replication Controller, Podといったコンセプトはデザインパターンとしてとらえた方がいいと思いました。

また、AmazonのECS（Amazon EC2 Container Service）もこのあたりの話だと思います。
AWSの他のサービスを活用できる点が強みだと思いますが、実際に使えるようになってくるのはまだこれからといった印象でした。

- [@shot6](https://twitter.com/shot6)さん Amazon EC2 Container Service(ECS)


## Dockerを支えるホストOS

CoreOSはDockerの基盤となるためのOSとして出てきた経緯がありますが、Redhatでも[Atomic Project](http://www.projectatomic.io/)としてそういった動きが出てきているというのが面白かったです。

<img alt="Redhat Project Atomic" src="/images/2015/01/18/project-atomic.png" />

- [@yuryu](https://twitter.com/yuryu)さん [RedHat atomic hostの話](http://www.slideshare.net/Yuryu/docker-on-project-atomic-docker-meetup-4)

CoreOSが新規に立ち上げてきているのに対し、RedhatのAtomic Hostでは既存のOSそれぞれ(Fedora, RHEL, CentOS）ベースにDockerのHostとしての基盤提供を目指しています。

Host/Guestの組み合わせに応じてサポート体制を用意していたり、さすがエンタープライズ向けにちゃんと考えられていると思いました。

## Dockerのパフォーマンス

- [@y_uuk1](https://twitter.com/y_uuk1)さん WebアプリケーションにおけるDockerパフォーマンスチューニング
- [@ten_forward](https://twitter.com/ten_forward)さん [cgroupによるリソース隔離入門](https://speakerdeck.com/tenforward/cgroupniyorurisosuge-li-ru-men-2015-01-17)

ISUCON向けのネットワーク、ファイルシステムを対象としたベンチマークでしたが、ネットワークの落とし穴以外についてはほとんど性能劣化がなかったのが意外でした。
（ファイルシステム周りについてはもうちょっと詳しく見た方がよさそうですが）

cgroupによるリソースコントロールについても概要くらいしか知らなかったので、実際にDockerプロセスに対して制限をかけているデモが見られてよかったです。
直接手をいれることはあまりないと思うのですが、こういうものが使えるというのは勉強になりました。

## Docker運用のノウハウ

Wantedlyさんの話がすごかった。

- [@spesnova](https://twitter.com/spesnova)さん Docker at Wantedly

自分で仕組みを作るのと同時にSaaSのサービスも多数活用していて圧巻でした。
Dockerを利用するにあたって、Herokuを利用してきたノウハウが役立ったというのはなるほどと思いました。
まずはHerokuを使ったサービス作りに取り組んでから移行していくとスムーズかも？

## LTも濃かった

- [@ixixi](https://twitter.com/ixixi)さん [Development and Deployment with Docker at Dwango](https://speakerdeck.com/ixixi/d-evelopment-and-deployment-with-docker-at-dwango)
- [@kazunori_279](https://twitter.com/kazunori_279) Google Container Engineについて
- DatadogさんのLT
- [@iNut](https://twitter.com/iNut)さん 共用スパコンシステム上でデータ解析 with Docker
- [@IanMLewis](https://twitter.com/IanMLewis)さん TBD
- [@takipone](https://twitter.com/takipone)さん Docker/ECSでIAMロールを利用する
- Mookさん GitのコミットごとにQA環境を作成するプロキシを作ってみた（仮
- [@ytnobody](https://twitter.com/ytnobody)さん tutumで雑に包んで雑にデプロイ


[tutum](https://www.tutum.co/)はベータ中で無料とのことなので試してみたいと思いました。


## まとめ

ホットな内容が満載でとても勉強になりました。

サービスレイヤーの技術基盤、プラットフォーム、ホストOSの充実、そしてエンタープライズでのサポートが開始されるなど、今後コンテナ技術を基盤としたサービス作りが本当に現実になってくるなと思いました。

