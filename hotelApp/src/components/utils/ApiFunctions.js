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

/**
 * Delete room
 * 
 * Au click du button l'id sera envoyé
 * */
export async function deleteRoom(roomId){
    try {
        const result = await api.delete(`/rooms/delete/room/${roomId}`)
        return result.data
    } catch (error) {
        throw new Error(`Error deleting room ${error.message}`)
    }
}

/** 
 * Update Room
 * 
 * on l'a fetch dabord et ensuite on edit au besoin
 **/
export async function updateRoom(roomId, roomData){
    const formData = new FormData();
    formData.append("roomType", roomData.roomType)
    formData.append("roomPrice", roomData.roomPrice)
    formData.append("photo", roomData.photo)
    
    const response = await api.put(`/rooms/update/${roomId}`, formData)
    return response
}

/**
 * Get room by id
 * 
 * @param {*} roomId 
 * @returns 
 */
export async function getRoomById(roomId){
    try {
        const result = await api.get(`/rooms/room/${roomId}`)
        return result.data
    } catch (error) {
        throw new Error(`Error fetching room : ${error.message}`)
    }
}

/** 
 *Booking part
 **/

 /*Save new booking*/
export async function bookRoom(roomId, booking){
    try {
        const response = await api.post(`/bookings/room/${roomId}/booking`, booking)
        return response.data
    } catch (error) {
        if(error.response && error.response.data){
            throw new Error("Error " + error.response.data)
        }else{
            throw new Error(`Error booking room : ${error.message}`)
        }
    }
}

/* Get All booking from the database */
export async function getAllBookings(){
    try {
        const result = await api.get("/bookings/all-bookings")
        return result.data
    } catch (error) {
        throw new Error(`Error fetching bookings : ${error.message}`)
    }
}

/** Get booking by the confirmationCode */
export async function getBookingByConfirmationCode(confirmationCode){
    try {
        const result = await api.get(`bookings/confirmation/${confirmationCode}`)
        return result.data
    } catch (error) {
        if(error.response && error.response.data){
            throw new Error("Error " + error.response.data)
        }else{
            throw new Error(`Error finding booking : ${error.message}`)
        }
    }
}

/**Cancel booking */
export async function cancelBooking(bookingId) {
    try {
        const result = await api.delete(`bookings/booking/${bookingId}/delete`)
        return result.data
    } catch (error) {
        throw new Error(`Error cancelling booking : ${error.message}`);
        
    }
}

/* This function gets all availavle rooms from the database with a given date and a room type */
export async function getAvailableRooms(checkInDate, checkOutDate, roomType) {
	const result = await api.get(
		`rooms/available-rooms?checkInDate=${checkInDate}&checkOutDate=${checkOutDate}&roomType=${roomType}`
	)
	return result
}
