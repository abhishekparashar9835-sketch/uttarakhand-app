import API from "../api/api";

class PlaceService {

    async getPlaces() {
        try {
            const response = await API.get("/places");
            return response.data.places;
        } catch (error) {
            console.log("PlaceService Error:", error);
            return [];
        }
    }

}

export default new PlaceService();