import cluster from 'cluster';
import os from 'os';
import chalk from 'chalk';

import startServer from './server';
import logger from './logger';

const CPUS = os.cpus();
if (cluster.isMaster) {
  // 通过cluster.isMaster 来验证当前进程是不是主进程
  CPUS.forEach(() => {
    // 一旦确定是主进程，则循环所有的内核处理器fork一个新的子进程。
    cluster.fork();
  });
  cluster.on('listening', (worker) => {
    // 进程发生时监听的端口
    logger.info('Cluster %s is connected!', chalk.green(worker.process.pid));
    // console.log("Cluster %d connected", worker.process.pid);
  });
  cluster.on('disconnect', (worker) => {
    // 一个进程从进程网络中断开时发生
    logger.info('Cluster %s is disconnected!', chalk.red(worker.process.pid));
  });
  cluster.on('exit', (worker) => {
    // 一个进程在操作系统关闭时发生
    logger.info('Cluster %s is dead!', chalk.red(worker.process.pid));
    // 如果一个老的cluster终端，确保一个新的cluster将启动。
    cluster.fork();
  });
} else {
  // 否则，为子进程启动应用服务器。
  startServer();
}
