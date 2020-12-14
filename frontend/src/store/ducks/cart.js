const TYPES = {
    ADD_ITEM: 'cart/ADD_ITEM',
    REMOVE_ITEM: 'cart/REMOVE_ITEM',
    CLEAR_CART: 'cart/CLEAR_CART',
    SHOW_CART: 'cart/SHOW_CART'
};

const initialState = { items: [], visible: false };

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case TYPES.ADD_ITEM: return {
            items: [...state.items, action.payload],
            visible: true
        };
        case TYPES.REMOVE_ITEM:
            return {
                items: [...state.items].filter((item) => item.id !== action.payload),
                visible: true
            };
        case TYPES.CLEAR_CART: return initialState;
        case TYPES.SHOW_CART: return { ...state, visible: true };
        default: return state;
    }
};

export const Creators = {
    addToCart: (item) => ({ type: TYPES.ADD_ITEM, payload: item }),
    removeFromCart: (id) => ({ type: TYPES.REMOVE_ITEM, payload: id }),
    clearCart: () => ({ type: TYPES.CLEAR_CART }),
    showCart: () => ({ type: TYPES.SHOW_CART })
};

export default reducer;