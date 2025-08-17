
export const getContacts = async () => {
  const res = await fetch(`https://playground.4geeks.com/contact/agendas/GabrielaToledo/contacts`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  if (!res.ok){
    createAgenda()
    return
  }
 const data = res.json()
 return data

};

const createAgenda = async () => {
  const response = await fetch(`https://playground.4geeks.com/contact/agendas/GabrielaToledo/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    

  });
}

export const addContact = async (newContact) => {
  const response = await fetch(`https://playground.4geeks.com/contact/agendas/GabrielaToledo/contacts`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newContact)

  });
  const data = response.json()
  return data

};

export const updateContact = async (id, contact) => {
  const res = await fetch(`https://playground.4geeks.com/contact/agendas/GabrielaToledo/contacts/`+id, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(contact),
  });

  const data = res.json()
  return data

};

export const deleteContact = async (id) => {
  const res = await fetch(`https://playground.4geeks.com/contact/agendas/GabrielaToledo/contacts/${id}`, {
    method: "DELETE",
  });
 
};