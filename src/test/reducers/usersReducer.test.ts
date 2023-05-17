import usersReducer from "../../redux/reducers/usersReducer"

describe("testinf userReduser", () => {
    test("Check initialState", () => {
        const state =usersReducer(undefined, {type: "unknown"})
        expect(state).toEqual({
            users: [],
            loading: false,
            error: ""
        })
    })
})

