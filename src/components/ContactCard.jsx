import { Link } from "react-router-dom";

export const ContactCard = ({ contact, onDelete }) => {
    return (
        <div className="card">
            <div className="card-body text-center">
                <i className="bi bi-person-rolodex fs-1 text-primary"></i>
                <h5 className="card-title mt-2">{contact.full_name}</h5>
                <p className="card-text">
                    📧 {contact.email} <br />
                    📞 {contact.phone} <br />
                    📍 {contact.address}
                </p>
                <div className="d-flex justify-content-between">
                    <Link
                        to={`/edit-contact/${contact.id}`}
                        className="btn btn-warning btn-sm"
                    >
                        Editar
                    </Link>

                    <button
                        className="btn btn-danger btn-sm"
                        onClick={onDelete}
                    >
                        Eliminar
                    </button>
                </div>
            </div>
        </div>
    );
};