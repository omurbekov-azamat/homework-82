import crypto from 'crypto';
import mongoose from "mongoose";
import config from "./config";
import Artist from "./modules/Artist";
import Album from "./modules/Album";
import Track from "./modules/Track";
import User from "./modules/User";

const run = async () => {
    mongoose.set('strictQuery', false);
    await mongoose.connect(config.db);
    const db = mongoose.connection;

    try {
        await db.dropCollection('tracks');
        await db.dropCollection('users');
        await db.dropCollection('albums');
        await db.dropCollection('artists');
        await db.dropCollection('trackhistories');
    } catch (e) {
        console.log('Collections were not present');
    }

    const [firstArtist, secondArtist] = await Artist.create({
        name: 'The Black Eyed Peas',
        image: 'fixtures/theBlackEyedPeas.jpg',
        information: 'Will.i.am, Fergie, apl.de.ap, Taboo',
    }, {
        name: 'The Weeknd',
        image: 'fixtures/weeknd.jpg',
        information: 'Abel Makkonen Tesfaye',
    });

    const [elephunk, monkey, madness, starboy] = await Album.create({
        artist: firstArtist._id,
        name: 'Elephunk',
        releaseDate: 2003,
        image: 'fixtures/elephunk.jpg',
    }, {
        artist: firstArtist._id,
        name: 'Monkey Business',
        releaseDate: 2005,
        image: 'fixtures/monkeyBusiness.jpg',
    }, {
        artist: secondArtist._id,
        name: 'Beauty Behind the Madness',
        releaseDate: 2011,
        image: 'fixtures/Madness.jpg',
    }, {
        artist: secondArtist._id,
        name: 'Starboy',
        releaseDate: 2015,
        image: 'fixtures/Starboy.jpg',
    });

    await Track.create({
        album: elephunk._id,
        name: 'I Gotta Feeling',
        duration: '02:33',
        trackNumber: 1,
        url: 'https://www.youtube.com/watch?v=uSD4vsh1zDA',
    }, {
        album: elephunk._id,
        name: 'Where is the Love?',
        duration: '03:15',
        trackNumber: 2,
        url: 'https://www.youtube.com/watch?v=WpYeekQkAdc',
    }, {
        album: elephunk._id,
        name: 'Boom Boom Pow',
        duration: '04:20',
        trackNumber: 3,
        url: 'https://www.youtube.com/watch?v=4m48GqaOz90',
    }, {
        album: elephunk._id,
        name: 'Just Can\'t Get Enough',
        duration: '03:25',
        trackNumber: 4,
        url: 'https://www.youtube.com/watch?v=OrTyD7rjBpw',
    }, {
        album: elephunk._id,
        name: 'Pump It',
        duration: '03:35',
        trackNumber: 5,
        url: 'https://www.youtube.com/watch?v=ZaI2IlHwmgQ',
    }, {
        album: monkey._id,
        name: 'The Time',
        duration: '03:50',
        trackNumber: 1,
        url: 'https://www.youtube.com/watch?v=JwQZQygg3Lk',
    }, {
        album: monkey._id,
        name: 'Let\'s Get It Started',
        duration: '02:43',
        trackNumber: 2,
        url: 'https://www.youtube.com/watch?v=IKqV7DB8Iwg'
    }, {
        album: monkey._id,
        name: 'Meet Me Halfway',
        duration: '03:37',
        trackNumber: 3,
        url: 'https://www.youtube.com/watch?v=I7HahVwYpwo',
    }, {
        album: monkey._id,
        name: 'My Humps',
        duration: '04:10',
        trackNumber: 4,
        url: 'https://www.youtube.com/watch?v=iEe_eraFWWs',
    }, {
        album: monkey._id,
        name: 'Imma Be',
        duration: '04:35',
        trackNumber: 5,
        url: 'https://www.youtube.com/watch?v=kdAj-dBNCi4',
    }, {
        album: madness._id,
        name: 'Wicked Games',
        duration: '03:25',
        trackNumber: 1,
        url: 'https://www.youtube.com/watch?v=O1OTWCd40bc',
    }, {
        album: madness._id,
        name: 'The Hills',
        duration: '03:49',
        trackNumber: 2,
        url: 'https://www.youtube.com/watch?v=yzTuBuRdAyA',
    }, {
        album: madness._id,
        name: 'Can\'t Feel My Face',
        duration: '03:19',
        trackNumber: 3,
        url: 'https://www.youtube.com/watch?v=KEI4qSrkPAs',
    }, {
        album: madness._id,
        name: 'In the Night',
        duration: '03:27',
        trackNumber: 4,
        url: 'https://www.youtube.com/watch?v=2iFa5We6zqw',
    }, {
        album: madness._id,
        name: 'Blinding Lights',
        duration: '04:07',
        trackNumber: 5,
        url: 'https://www.youtube.com/watch?v=4NRXx6U8ABQ',
    }, {
        album: starboy._id,
        name: 'I Feel It Coming',
        duration: '04:10',
        trackNumber: 1,
        url: 'https://www.youtube.com/watch?v=qFLhGq0060w',
    }, {
        album: starboy._id,
        name: 'Starboy',
        duration: '03:39',
        trackNumber: 2,
        url: 'https://www.youtube.com/watch?v=34Na4j8AVgA',
    }, {
        album: starboy._id,
        name: 'The Morning',
        duration: '03:05',
        trackNumber: 3,
        url: 'https://www.youtube.com/watch?v=5TAko3RH0bk',
    }, {
        album: starboy._id,
        name: 'Earned It',
        duration: '02:57',
        trackNumber: 4,
        url: 'https://www.youtube.com/watch?v=waU75jdUnYw',
    }, {
        album: starboy._id,
        name: 'Call Out My Name',
        duration: '03:19',
        trackNumber: 5,
        url: 'https://www.youtube.com/watch?v=M4ZoCHID9GI',
    });

    await User.create({
        username: 'user',
        password: '123',
        token: crypto.randomUUID(),
    }, {
        username: 'admin',
        password: '123',
        token: crypto.randomUUID(),
        role: 'admin'
    });

    await db.close();
};

void run();