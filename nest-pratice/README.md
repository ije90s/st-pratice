# NEST-PRATICE

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## 기타

- 윈도우 환경에서 레디스를 띄우고(wsl 레디스 설치) 진행했으나, 레디스에 값을 저장되지 않음. `원인 파악되지 않음`
- 해당 명령어, nest 버전 확인 후에 재 진행했으나, 현상은 동일
  - redis: 7.4.1
  - nestjs: 11

```bash
-- wsl에서 확인
-- 레디스 네트워크 확인
$ redis-cli ping
$ redis-cli -h 127.0.0.1 -p 6379 ping

-- 레디스 바인딩 확인
$ sudo nano /etc/redis/redis.conf

-- 레디스 버전 확인
$ redis-cli --version

-- 윈도우에서 확인
-- 아웃 바운드 확인
$ netstat -an | findstr :6379

-- 실제 레디스 IP 확인
$ ip addr show eth0 | grep "inet "

-- 레디스 설치
$ wsl --install 원하는 리눅스 서버버
$ sudo apt update
sudo apt install redis-server
$ sudo service redis-server start
$ sudo service redis-server status
$ redis-cli ping

```
