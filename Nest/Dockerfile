FROM node:20-alpine3.17
#postavi radni direktorijum    
WORKDIR /usr/src/app
#ovo ./ zamenjuje /usr/src/app ||||| ovo u 5 liniji znaci kopiraj u radni dir samo listu paketa za instalaciju 
COPY package*.json ./
RUN npm install
# prva tacka -> trenutni dir a to je SONGS-DOCKER, sve odatle u, a ova druga tacka je radni dir u kontejneru
# ova 2 tacka moze da se napise i kao /usr/src/app
# zasto ovo radimo? Pa kad napravimo kontejner, mi smo napravili kao mini virtuelnu masinu i sad pokusavamo da prekopiramo u nju stvari, instaliramo u njoj sta treba pa prekopiramo source fajlove
COPY . .
RUN npm run build
#svaka linija je jedan sloj i vrlo je bitan redosled
CMD [ "npm", "run", "start:prod" ]