// db.js
import Dexie from 'dexie';

export const db = new Dexie('MyQuiz1');
db.version(1).stores({
    items: 'id, content, title', // Primary key and indexed props
});
