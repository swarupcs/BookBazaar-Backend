

export const setAuthCookies = (res, accessToken, refreshToken) => {
    res.cookie('accessToken', accessToken, {})
}