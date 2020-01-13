let initialState = {
    number: 0,
    id:""
} ;

const firstreducer = (state = { DataTableData: {number:0}, dummy:null}, action) => {

    switch(action.type) {
        case INCREMENT:
            state.DataTableData[action.payload.tableId].number++;
            state.DataTableData = Object.assign({}, state.DataTableData);
            state.DataTableData["park"].number  =  state.DataTableData["kim"].number/2;
            return {
                ...state,
            } ;
        case DECREMENT:
            state.DataTableData[action.payload.tableId].number--;
            state.DataTableData = Object.assign({}, state.DataTableData);
            state.DataTableData["park"].number  =  state.DataTableData["kim"].number/2;
            return {
                ...state,
            } ;
        case TESTACTION:
            if(state.DataTableData[action.payload.tableId]){
              return {
                  ...state,
              } ;
            }
            state.DataTableData[action.payload.tableId] = action.payload.tableData
            return {
                ...state,
            } ;
        default:
            return state ;
    }
}

export default firstreducer;

// 액션 타입 정의
const INCREMENT = 'INCREMENT' ;
const DECREMENT = 'DECREMENT' ;
const TESTACTION = 'TESTACTION'

// 액션 생성 함수 정의
export const increment = (tableSettings) => ({ type: INCREMENT , payload:{
    tableId:tableSettings.id ,
} }) ;
export const decrement = (tableSettings) => ({ type: DECREMENT , payload:{
    tableId:tableSettings.id ,
} }) ;
export const saveinfo =  (tableSettings) =>({
type: "TESTACTION",
payload:{
    tableId:tableSettings.id ,
    tableData: {
           fetching: true,
           fetched: false,
           error: null,
           data: null,
           dataTotalSize: null,
           number:0,
   },
}
})
/*export const saveinfo =  (tableSettings,p2,p3) => dispatch => {
  dispatch({
  type: "saveinfo",
  payload:{
      tableId:tableSettings.tableId ,
      tableData: {
           [tableSettings.tableID]: {
             fetching: true,
             fetched: false,
             error: null,
             data: null,
             dataTotalSize: null,
           },
     },
 }
})*/
