# Chapp
Basic IRC chat app, it shouldn't crash with wrong address/port, or wrong "user + pw"-line.
With more time I would have kept authentication state serverside, since now there is severe vulnerabilities in that the client itself makes
the user authenticate itself.. which should be the other way around.
Net and Readline modules was new for me so spent alot of time getting the hang of it, which was valuable.


## Start server with node server/server.js
![image](https://user-images.githubusercontent.com/83879466/191219716-724fe9c4-0361-4961-ac84-89df2852b77e.png)


## Start clients
![image](https://user-images.githubusercontent.com/83879466/191220323-d53eacdb-148c-45b1-a1a0-2ca30e99f160.png)


## Connect clients to "127.0.0.1:3050" and with users "foo 123" // "bar 321" 

![image](https://user-images.githubusercontent.com/83879466/191220707-de33d23d-2107-4708-bedb-a559b9f0eb1e.png)

![image](https://user-images.githubusercontent.com/83879466/191221237-340a3cc4-5fa2-4aac-9602-050e9d83bdd9.png)

# Results
Writing on one client, sends out to all other connected clients.
![image](https://user-images.githubusercontent.com/83879466/191221863-fe595adb-7ff3-499c-8a6d-4136ae4afc16.png)
