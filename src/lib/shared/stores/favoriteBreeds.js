import { browser } from "$app/environment";
import { writable } from "svelte/store";

export const favoriteBreeds = writable(browser ? JSON.parse(localStorage.getItem('favoriteBreeds') || '[]') : []);

favoriteBreeds.subscribe((value) => {
    if (browser) {
        window.localStorage.setItem('favoriteBreeds', JSON.stringify(value));
    }
});

export { favoriteBreeds as default };
