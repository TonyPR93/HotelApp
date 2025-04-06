import axios from "axios"

export const api = axios.create({
    baseURL :"http://localhost:9192"
})
/**
 * Add a new room to the database
 */
export async function addRoom(photo, roomType, roomPrice) {
    const formData = new FormData()
    formData.append("photo", photo)
    formData.append("roomType", roomType)
    formData.append("roomPrice", roomPrice)

    const response = await api.post("/rooms/add/new-room", formData)
    if (response.status === 201){
        return true;
    }else{
        return false;
    }
}

/**
 * This func get akk room type from database
 */
export async function getRoomTypes() {
    try {
        const response = await api.get("/rooms/room/types")
        return response.data
    } catch (error) {
        throw new Error("Error fetching room types");
        
    }
}

/**
 * Func that return all rooms from database 
 * @returns 
 */
export async function getAllRooms() {
    try {
        const result = await api.get("/rooms/all-rooms")
        return result.data
    } catch (error) {
        throw new Error("Error fetching all rooms")
    }
}