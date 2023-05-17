import React, { useEffect } from "react";
import { useState } from "react";
import { Input } from "@progress/kendo-react-inputs";
import { ToastContainer, toast } from "react-toastify"
import { Dialog, DialogActionsBar } from "@progress/kendo-react-dialogs";

interface AddContact {
    toggleDialog: () => void;
    visible: boolean;
    add: boolean;
    edit: boolean;
    dataCopy: any;
    prop: any;
}


const ContactForm: React.FC<AddContact> = ({ toggleDialog, visible, dataCopy, add, edit }) => {
    const [addContact, setAddContact] = useState<any>({ name: "", phone: "" });
    const [editContact, setEditContact] = useState<any>("");
    const [editData, SetEditData] = useState<any>("");


    useEffect(() => {
        if (edit && !add && (dataCopy.prop?.name !== undefined && dataCopy.prop?.phone !== undefined)) {
            setEditContact({ name: dataCopy.prop.name, phone: dataCopy.prop.phone });
            SetEditData(dataCopy.prop)
        }

    }, [edit, add, dataCopy.prop?.incoType, dataCopy.prop])


    const EditFormClose = () => {
        toggleDialog();
        setEditContact({ name: "", phone: "" });
    }
    const AddFormClose = () => {
        toggleDialog();
        setAddContact({ name: "", phone: "" });
    }
    console.log(addContact, "addContact")

    return (

        <div>
            {visible && (
                <>
                    {add ? (<Dialog title={"Add INCO"} onClose={AddFormClose} width={"500px"}>
                        <form className="dialog-form" onSubmit={(e) => {
                            dataCopy.func(e, addContact);
                            AddFormClose();
                        }}>
                            <Input
                                name="Name"
                                label="Enter Name"
                                required={true}
                                value={addContact.name}
                                onChange={(e) => {
                                    setAddContact({ ...addContact, name: e.target.value });
                                }}
                                style={{
                                    width: "300px",
                                    marginBottom: '20px'
                                }}

                                autoComplete="off"
                            />
                            <Input
                                name="Phone"
                                label="Enter Phone"
                                required={true}
                                value={addContact.phone}
                                onChange={(e) => {
                                    setAddContact({ ...addContact, phone: e.target.value });
                                }}
                                style={{
                                    width: "300px",
                                    marginBottom: '20px'
                                }}

                                autoComplete="off"
                            />


                            <DialogActionsBar>
                                <button
                                    className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base"
                                    // onClick={onAddInco}
                                    type="submit"
                                >
                                    Add
                                </button>
                                <button
                                    className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base"
                                    onClick={AddFormClose}
                                >
                                    Cancel
                                </button>
                            </DialogActionsBar>
                        </form>
                    </Dialog>
                    ) : (
                        <Dialog title={"Edit INCO"} onClose={EditFormClose} width={"500px"}>
                            <form className="dialog-form" onSubmit={(e) => {
                                dataCopy.func(e, editContact);
                                EditFormClose()
                            }}>
                                <Input
                                    name="Name"
                                    label="Name"
                                    required={true}
                                    value={editContact.name}
                                    onChange={(e) => {
                                        setEditContact({ ...editContact, name: e.target.value });
                                    }}
                                    style={{
                                        width: "300px",
                                        marginBottom: '20px'
                                    }}
                                    autoComplete="off"
                                />
                                <Input
                                    name="Phone"
                                    label="Phone"
                                    required={true}
                                    value={editContact.phone}
                                    onChange={(e) => {
                                        setEditContact({ ...editContact, phone: e.target.value });
                                    }}
                                    style={{
                                        width: "300px",
                                        marginBottom: '20px'
                                    }}
                                    autoComplete="off"
                                />

                                <DialogActionsBar>
                                    <button
                                        className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base"
                                        // onClick={editIncoType}
                                        type="submit"
                                    >
                                        Confirm
                                    </button>
                                    <button
                                        className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base"
                                        onClick={EditFormClose}
                                    >
                                        Cancel
                                    </button>
                                </DialogActionsBar>
                            </form>
                        </Dialog>)}
                </>

            )}
        </div>
    )
}

export default ContactForm