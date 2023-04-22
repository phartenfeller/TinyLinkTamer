import Database from 'better-sqlite3';
import type { Redirect } from './types';

const db = new Database('./data/redirect-db.sqlite', { verbose: console.log });
initDb();

function initTables() {
	db.exec(
		`CREATE TABLE IF NOT EXISTS redirects (
      red_id INTEGER PRIMARY KEY AUTOINCREMENT,
      red_desc TEXT NOT NULL,
      red_key TEXT NOT NULL,
      red_url TEXT NOT NULL,
      red_created_at INTEGER NOT NULL,
      constraint redirects_uk unique (red_key)
    ) strict;

    CREATE TABLE IF NOT EXISTS redirect_hits (
      hit_id INTEGER PRIMARY KEY AUTOINCREMENT,
      hit_red_id INTEGER NOT NULL,
      hit_at INTEGER NOT NULL,
      constraint redirect_hits_fk foreign key (hit_red_id) references redirects (red_id) on delete cascade
    ) strict;

    CREATE INDEX IF NOT EXISTS redirect_hits_hit_red_id_idx ON redirect_hits (hit_red_id);`
	);
}

function initDb() {
	db.exec('PRAGMA foreign_keys = ON;');
	db.exec(`PRAGMA journal_mode = WAL;`);
	db.exec(`PRAGMA synchronous = NORMAL;`);

	console.log('Optimizing database...');
	db.exec(`PRAGMA vacuum;`);
	db.exec(`PRAGMA optimize;`);
	console.log('Database optimized.');

	initTables();
}

export function addRedirect(desc: string, key: string, url: string) {
	const stmt = db.prepare(
		`INSERT INTO redirects (red_desc, red_key, red_url, red_created_at) VALUES (?, ?, ?, ?)`
	);
	return stmt.run(desc, key, url, Date.now());
}

export function addRedirectHit(redId: number) {
	const stmt = db.prepare(`INSERT INTO redirect_hits (hit_red_id, hit_at) VALUES (?, ?)`);
	return stmt.run(redId, Date.now());
}

export function getRedirectUrl(key: string) {
	const stmt = db.prepare(
		`SELECT red_url as "url", red_id as "id" FROM redirects WHERE red_key = ?`
	);
	const data = stmt.get(key) as { url: string; id: number } | undefined;
	return data;
}

export function getAllRedirects() {
	const stmt = db.prepare(`
    SELECT red_id as "id"
         , red_desc as "desc"
         , red_key as "key"
         , red_url as "url"
         , red_created_at as "createdAt"
         , count(hit_id) as "hits"
      FROM redirects
      LEFT JOIN redirect_hits ON hit_red_id = red_id`);
	return stmt.all() as Redirect[];
}
