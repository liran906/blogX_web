export interface jwtPayload {
    "userID": number
    "username": string
    "role": number
    "exp": number
    "iat": number
    "iss": string
}

export function parseToken(token: string): jwtPayload{
    const payLoadString = token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/")
    return JSON.parse(decodeURIComponent(escape(window.atob(payLoadString))))
}