import { useState, useEffect } from "react"

function Orgsitems({id, name, handlerDeleteButton}) {
  return (
    <article className="w-96 bg-gray-100 rounded-xl shadow-lg shadow-gray-700 mx-auto mt-10 p-5">
      <h3 className="text-center text-2xl mb-5">{name}</h3>
      <p>id: {id}</p>
      <div className="flex justify-center my-5">
        <button className="bg-red-800 text-gray-100 w-32 font-semibold rounded-xl h-10 hover:bg-red-900 hover: text-gray-200" onClick={ handlerDeleteButton }>Delete</button>
      </div>
    </article>
  )
}

function App() {
  const [organizaciones, setOrganizacion] = useState([])
  const [dataForm, setDataForm] = useState({})

  const getOrganizacion = async () => {
    const all_organizaciones = await fetch ("http://localhost:8000/api/v1/organizaciones")
    const orgsjson = await all_organizaciones.json()
    setOrganizacion(orgsjson)
  }


//  Para no crear un estado por cada input de los que tenemos, creamos este objeto y estructuramos los objetos que NO estén siendo modificados.

  const handlerFormInput = (e) => {
    setDataForm(
      {
        ...dataForm,
        [e.target.name]: e.target.value
      }
    )
  }

  const handlerFormSubmit = async (e) => {
    e.preventDefault()
    await fetch("http://127.0.0.1:8000/api/v1/organizaciones", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(dataForm)
    })
  }

  const handlerDeleteButton = async (organization_id) => {
    await fetch(`http://127.0.0.1:8000/api/v1/organizaciones/${organization_id}`, {
      method: "DELETE",
    })

    getOrganizacion()
  } 

  useEffect(() => {
    getOrganizacion()
  })

  return (
    <main className="w-full min-h-screen bg-color-300">
      <h1 className="text-red-50">This is my app</h1>

      <form onSubmit={ handlerFormSubmit }>
        <input type="text" name="id" onChange={ handlerFormInput } value={dataForm.id} placeholder="Id..." required/>
        <input type="text" name="name" onChange={ handlerFormInput } value={dataForm.name} placeholder="Name..." required/>
        <input type="submit" vaue="Create"/>
      </form>

      <div>
        {
          organizaciones.length === 0 ? "Loader.." : organizaciones.map(organizacion => (
            <Orgsitems 
            id={organizacion.id}
            name={organizacion.name}
            handlerDeleteButton={ () => handlerDeleteButton(organizacion.id) }
            />
          ))
        }
      </div>
    </main>
  )
}

export default App
 