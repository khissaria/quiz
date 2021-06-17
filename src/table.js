import { removeTypeDuplicates } from "@babel/types";
import React, { Component } from "react";
import Debutant from './debutant'
import Question from './questions';
import NewZealand from './newzealand'
import tableHeader from './tableHeader'




class Table extends Component {

    constructor(props) {
        super(props);

        const questionDetail = Question.find(q => q.id === props.quizID);
        const columnHeader = tableHeader.find(q => q.id === props.quizID);
        if (questionDetail.id === 1) {
            this.state = {

                entries: Debutant,
                columns: columnHeader
            }
        }
        if (questionDetail.id === 2) {
            this.state = {
                entries: NewZealand,
                columns: columnHeader
            }
        }


    }

    renderTable() {
        return this.state.entries.map((entries, index) => {

            const { id, column1, column2, column3 } = entries;
            return (
                <tr key={id}>

                    <td className="d_name" id={'name' + id}>{column1}</td>
                    <td className="d_value" id={'slot' + id}></td>
                    <td className="d_extra" id={'extra' + id}>{column3}</td>
                </tr>
            )
        })
    }
    renderTableHeader() {


        return (
            <tr>

                <th className="h_name" align="center">{this.state.columns.column1}</th>
                <th className="h_value" align="center">{this.state.columns.column2}</th>
                <th className="h_extra" align="center">{this.state.columns.column3}</th>
            </tr>
        )

    }
    render() {
        return (
            <table className="data">
                <tbody>
                    {this.renderTableHeader()}

                    {this.renderTable()}
                </tbody>
            </table>
        )
    }
}

export default Table;