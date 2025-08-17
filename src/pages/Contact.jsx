import { useEffect } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { getContacts, deleteContact } from "../api/ContactApi";
import { ContactCard } from "../components/ContactCard";
import { Link } from "react-router-dom";

export const Contact = () => {
    const { store, dispatch } = useGlobalReducer();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getContacts();
                dispatch({ type: "get_contacts", payload: data.contacts }); // IMPORTANTE: data.contacts
            } catch (error) {
                console.error("Error cargando contactos:", error);
            }
        };
        fetchData();
    }, [dispatch]);

    const handleDelete = async (id) => {
        try {
            await deleteContact(id);
            dispatch({ type: "delete_contact", payload: id });
        } catch (error) {
            console.error("Error al eliminar contacto:", error);
        }
    };

    if (!store.contacts) return <p>Cargando contactos...</p>;

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h1>Lista de Contactos</h1>
                <Link to="/add-contact" className="btn btn-success">
                    Add new contact
                </Link>
            </div>

            {store.contacts.length === 0 ? (
                <p>No hay contactos en tu agenda.</p>
            ) : (
                <div className="row">
                    {store.contacts.map((contact) => (
                        <div className="col-md-4 mb-3" key={contact.id}>
                            <ContactCard
                                contact={contact}
                                onDelete={() => handleDelete(contact.id)}
                            />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};