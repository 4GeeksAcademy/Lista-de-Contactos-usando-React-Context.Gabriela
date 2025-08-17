import { useState, useEffect } from "react";
import { addContact, updateContact, getContacts } from "../api/ContactApi";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { useNavigate, useParams } from "react-router-dom";

export const AddContact = () => {
    const { store, dispatch } = useGlobalReducer();
    const navigate = useNavigate();
    const { id } = useParams(); // si existe, es edición

    // Estado del formulario
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
        agenda_slug: "GabrielaToledo"
    });

    // Si estamos editando, cargamos datos del contacto
    useEffect(() => {
        if (id) {
            const contactToEdit = store.contacts.find(c => c.id === parseInt(id));
            if (contactToEdit) {
                setFormData(contactToEdit);
            }
        }
    }, [id, store.contacts]);

    // Manejo de cambios en inputs
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // Guardar contacto (crear o actualizar)
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (id) {
                // Actualizar
                const updated = await updateContact(id, formData);
                console.log (updated)
                dispatch({ type: "update_contact", payload: updated });
            } else {
                // Crear
                const newContact = await addContact(formData);
                dispatch({ type: "add_contact", payload: newContact });
            }

            // Volver a la lista de contactos actualizada
            const updatedList = await getContacts();
            if(updatedList){

            
            dispatch({ type: "get_contacts", payload: updatedList.contacts });

            navigate("/contacts");
            }
        } catch (error) {
            console.error("Error al guardar contacto:", error);
        }
    };

    return (
        <div className="container mt-4">
            <h1>{id ? "Editar contacto" : "Agregar nuevo contacto"}</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Nombre</label>
                    <input
                        type="text"
                        className="form-control"
                        name="name" 
                        value={formData.name}  
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Teléfono</label>
                    <input
                        type="text"
                        className="form-control"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Dirección</label>
                    <input
                        type="text"
                        className="form-control"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        required
                    />
                </div>

                <button type="submit" className="btn btn-primary">
                    {id ? "Actualizar" : "Guardar"}
                </button>
            </form>
        </div>
    );
};