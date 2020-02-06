import { weatherStore } from "../store/weatherStore";

export class Getters {

    static getFavorites= () => {
        return weatherStore.favorites;
    }
}