const FETCH_POLLS = "FETCH_POLLS"

export default function (state = [], action = {}) {
    switch (action.type) {
        case FETCH_POLLS:
            return action.polls;
        default:
            return state;
    }
}