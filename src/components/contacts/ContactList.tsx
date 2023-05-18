import React, { useState } from 'react'
import { Dialog, DialogActionsBar } from "@progress/kendo-react-dialogs";
import {
    Grid,
    GridColumn as Column,
    GridToolbar,
} from "@progress/kendo-react-grid";
import { Button } from "@progress/kendo-react-buttons";
import { process, State } from "@progress/kendo-data-query";
import LoadingPanel from '../utilities/LoadingPanel';
import ContactForm from './ContactForm';
import '../../index.css'

const contactsData = [
    { name: 'John Doe', phone: '1234567890' },
    { name: 'Jane Smith', phone: '9876543210' },
    { name: 'walt', phone: '8899883992' }
];


const initialDataState = {
    take: 10,
    skip: 0,
};

function ContactList() {
    const _grid = React.useRef<any>();
    const [data, setData] = useState<any[]>(contactsData);
    const [dataCopy, setDataCopy] = React.useState<any>(contactsData);
    const [visible, setVisible] = useState<boolean>(false);
    const [deleteDialogVisible, setDeleteDialogVisible] = useState<boolean>(false);
    const [deleteContact, setDeleteContact] = useState<any>("");
    const [add, setAdd] = useState<boolean>(false);
    const [edit, setEdit] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [dataState, setDataState] = useState<any>(initialDataState);

    const toggleDialog = () => {
        setVisible(!visible);
    };

    const toggleDeleteDialog = () => {
        setDeleteDialogVisible(!deleteDialogVisible);
    };

    const deleteButtonHandler = async (props: any) => {
        setDeleteContact(props.dataItem);
        toggleDeleteDialog();
    }


    const DeleteContact = () => {
        setData(prevData => prevData.filter((n) => deleteContact.phone !== n.phone));
        toggleDeleteDialog();
    };


    const deleteCell = (props: any) => {
        return (
            <td style={{ textAlign: "center", gap: "10px" }}>
                <Button
                    icon="delete"
                    fillMode="outline"
                    themeColor="primary"
                    onClick={() => deleteButtonHandler(props)}
                ></Button>
                &emsp;
                <Button
                    icon="edit"
                    fillMode="outline"
                    themeColor="primary"
                    onClick={() => {
                        setDataCopy({
                            func: EditContact,
                            prop: props.dataItem,
                        });
                        toggleDialog();
                        setEdit(true);
                        setAdd(false);
                    }}
                ></Button>
            </td>
        );
    };

    const AddContact = (e: any, addContact: { name: string; phone: string }) => {
        console.log(addContact);
        setData(prevData => [...prevData, addContact]);
        setAdd(false);
    }

    const EditContact = (e: any, editContact: { name: string; phone: string }) => {
        setData(prevData => [...prevData, editContact])
        setEdit(false);
    };

    return (
        <div className='main'>
            {loading && <LoadingPanel />}
            {visible && (
                <ContactForm
                    toggleDialog={toggleDialog}
                    visible={visible}
                    dataCopy={dataCopy}
                    add={add}
                    edit={edit}
                    prop={data}
                />
            )}
            {deleteDialogVisible && (
                <Dialog title={"Please confirm"} onClose={toggleDeleteDialog}>
                    <p
                        style={{
                            margin: "25px",
                            textAlign: "center",
                        }}
                    >
                        Are you sure you want to delete {deleteContact.name} ?
                    </p>
                    <DialogActionsBar>
                        <button
                            className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base"
                            onClick={toggleDeleteDialog}
                        >
                            No
                        </button>
                        <button
                            className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base"
                            onClick={DeleteContact}
                        >
                            Yes
                        </button>
                    </DialogActionsBar>
                </Dialog>
            )}
            <div>
                <Grid
                    data={process(data, dataState)}
                    // style={{ height: "500px" }}
                    sortable={true}
                    filterable={true}
                    className={"my-grid"}
                    onDataStateChange={(e) => {
                        setDataState(e.dataState);
                    }}
                    ref={_grid}
                >
                    <GridToolbar >
                        <h4>Contacts List</h4>
                        <div>
                            <button className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-primary"
                                onClick={() => {
                                    setDataCopy({
                                        func: AddContact
                                    });
                                    toggleDialog();
                                    setEdit(false);
                                    setAdd(true);
                                }}
                            >
                                Add Contact
                            </button>
                        </div>
                    </GridToolbar>
                    <Column field='name' title='Name' />
                    <Column field='phone' title='Phone' />
                    <Column
                        field="delete"
                        title="Action"
                        cell={deleteCell}
                        filterable={false}
                        sortable={false}
                    />
                </Grid>
            </div>

        </div>
    )




}

export default ContactList