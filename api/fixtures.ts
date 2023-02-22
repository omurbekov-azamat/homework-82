import mongoose from "mongoose";
import config from "./config";
import Artist from "./modules/Artist";
import Album from "./modules/Album";
import Track from "./modules/Track";

const run = async () => {
    mongoose.set('strictQuery', false);
    await mongoose.connect(config.db);
    const db = mongoose.connection;

    try {
        await db.dropCollection('albums');
        await db.dropCollection('artists');
        await db.dropCollection('trackhistories');
        await db.dropCollection('tracks');
        await db.dropCollection('users');
    } catch (e) {
        console.log('Collections were not present');
    }

    const [firstArtist, secondArtist] = await Artist.create({
        name: 'The Black Eyed Peas',
        image: 'fixtures/theBlackEyedPeas.jpg',
        information: 'Members: Will.i.am, Fergie, apl.de.ap, Taboo',
    }, {
        name: 'The Weeknd',
        image: 'fixtures/weeknd.jpg',
        information: 'Members: Abel Makkonen Tesfaye',
    });

    const [elephunk, monkey, madness, starboy] = await Album.create({
        artist: firstArtist._id,
        name: 'Elephunk',
        date: 'June 24, 2003',
        image: 'fixtures/elephunk.jpg',
    }, {
        artist: firstArtist._id,
        name: 'Monkey Business',
        date: ' June 7, 2005',
        image: 'monkeyBusiness.jpg',
    }, {
        artist: secondArtist._id,
        name: 'Beauty Behind the Madness',
        date: '2011',
        image: 'fixtures/Madness.jpg',
    }, {
        artist: secondArtist._id,
        name: 'Starboy',
        date: '2015',
        image: 'fixtures/Starboy.jpg',
    });

    await Track.create({
        album: elephunk._id,
        name: 'I Gotta Feeling',
        duration: '02:33',
        trackNumber: 1,
    }, {
        album: elephunk._id,
        name: 'Where is the Love?',
        duration: '03:15',
        trackNumber: 2,
    }, {
        album: elephunk._id,
        name: 'Boom Boom Pow',
        duration: '04:20',
        trackNumber: 3,
    }, {
        album: elephunk._id,
        name: 'Just Can\'t Get Enough',
        duration: '03:25',
        trackNumber: 4,
    }, {
        album: elephunk._id,
        name: 'Pump It',
        duration: '03:35',
        trackNumber: 5,
    }, {
        album: monkey._id,
        name: 'The Time',
        duration: '03:50',
        trackNumber: 1,
    }, {
        album: monkey._id,
        name: 'Let\'s Get It Started',
        duration: '02:43',
        trackNumber: 2,
    }, {
        album: monkey._id,
        name: 'Meet Me Halfway',
        duration: '03:37',
        trackNumber: 3,
    }, {
        album: monkey._id,
        name: 'My Humps',
        duration: '04:10',
        trackNumber: 4,
    }, {
        album: monkey._id,
        name: 'Imma Be',
        duration: '04:35',
        trackNumber: 5,
    }, {
        album: madness._id,
        name: 'Wicked Games',
        duration: '03:25',
        trackNumber: 1,
    }, {
        album: madness._id,
        name: 'The Hills',
        duration: '03:49',
        trackNumber: 2,
    }, {
        album: madness._id,
        name: 'Can\'t Feel My Face',
        duration: '03:19',
        trackNumber: 3,
    }, {
        album: madness._id,
        name: 'In the Night',
        duration: '03:27',
        trackNumber: 4,
    }, {
        album: madness._id,
        name: 'Blinding Lights',
        duration: '04:07',
        trackNumber: 5,
    }, {
        album: starboy._id,
        name: 'I Feel It Coming',
        duration: '04:10',
        trackNumber: 1,
    }, {
        album: starboy._id,
        name: 'Starboy',
        duration: '03:39',
        trackNumber: 2,
    }, {
        album: starboy._id,
        name: 'The Morning',
        duration: '03:05',
        trackNumber: 3,
    }, {
        album: starboy._id,
        name: 'Earned It',
        duration: '02:57',
        trackNumber: 4,
    }, {
        album: starboy._id,
        name: 'Call Out My Name',
        duration: '03:19',
        trackNumber: 5,
    });
    await db.close();
};

void run();