import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import 'dotenv/config';
import { router } from './routes';

const app = express();

const serverHttp = http.createServer(app);

const io = new Server(serverHttp, {
  cors: { origin: '*' },
});

app.use(express.json());
app.use(cors());

app.use(router);

app.get('/github', (request, response) => {
  response.redirect(
    `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`
  );
});

app.get('/signin/callback', (request, response) => {
  const userAgent = request.headers['user-agent'];
  const { code } = request.query;

  if (userAgent?.includes('Mobile')) {
    return response.redirect(
      `https://auth.expo.io/${process.env.EXPO_USERNAME}/${process.env.EXPO_PROJECT_NAME}?code=${code}`
    );
  } else {
    return response.redirect(`http://localhost:3000?code=${code}`);
  }
});

export { serverHttp, io };
