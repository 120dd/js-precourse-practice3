import { DataPersist } from '../persist/DataPersist';

export class LocalStoragePersist extends DataPersist {
	save(key, value) {
		localStorage.setItem(key, JSON.stringify(value));
	}

	// eslint-disable-next-line no-unused-vars
	load(key) {
		return JSON.parse(localStorage.getItem(key));
	}
}
