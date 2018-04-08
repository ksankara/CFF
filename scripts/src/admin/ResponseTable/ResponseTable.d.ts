interface IResponseTableProps {
    match: {
        params: {
            formId: string
        }
    },
    onError: (any) => void,
    editMode: boolean
}

interface IResponseTableState {
    status: number,
    tableData: any[],
    tableHeaders: any[],
    tableDataOrigObject: any,
    tableDataDisplayed: any[],
    tableHeadersDisplayed: any[],
    pivotCols: any[],
    schema: Schema,
    dataOptions: IDataOptions,
    possibleFieldsToUnwind: string[],
    rowToUnwind: string,
    colsToAggregate: any[],
    loading: boolean,
    hasError: boolean
}