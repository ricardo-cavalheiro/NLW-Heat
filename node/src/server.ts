import { serverHttp } from './app';
import 'dotenv/config'

serverHttp.listen(4000, process.env.LOCAL_IP);