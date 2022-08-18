import { DataPersister } from './DataPersister.js';

export class LocalDataPersister extends DataPersister {
	save(key, value) {
		localStorage.setItem(key, JSON.stringify(value));
	}

	load(key) {
		return JSON.parse(localStorage.getItem(key));
	}
}
