import React, { useEffect, useState } from 'react';
import axios from 'axios';
import style from '../src/css/style.module.css'

export default function Inventario() {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    marca: "",
    tipoEquipo: "",
    departamento: "",
    fechaAsignacion: "",
    personaResponsable: "",
    fechaIngreso: ""
  });

  const [updateId, setUpdateId] = useState("");



  // Obtener todos los productos
  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5020/inventario/viewAll');
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products: ", error);
    }
  };

  // Agregar nuevo producto
  const addProduct = async () => {
    try {
      await axios.post('http://localhost:5020/inbentario/newProducto', newProduct);
      alert("Producto añadido con éxito");
      fetchProducts();
    } catch (error) {
      console.error("Error adding product: ", error);
    }
  };

  // Actualizar producto
  const updateProduct = async () => {
    try {
      await axios.put(`http://localhost:5020/inventario/updateProducto/${updateId}`, newProduct);
      alert("Producto actualizado con éxito");
      fetchProducts(); // Refresh product list after updating
    } catch (error) {
      console.error("Error updating product: ", error);
    }
  };

  // Eliminar producto
  const deleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:5020/inventario/delete/${id}`);
      alert("Producto eliminado con éxito");
      fetchProducts(); // Refresca la lista de productos
    } catch (error) {
      console.error("Error deleting product: ", error.response?.data || error.message);
    }
  };


  // Handle input changes for new or updated product
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };


  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value
    }));
  };

  // Load products when component mounts
  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <h1>Gestión de Inventario</h1>

      <h2>Llenar datos</h2>
  
      <hr />

      <div className={style.container}>
        <form className={style.form}>
          <label htmlFor="marca" className={style.label}>Marca:</label>
          <input
            type="text"
            name="marca"
            placeholder="Ingresa la marca"
            value={newProduct.marca}
            onChange={handleChange}
            required
            className={style.input}
          />

          <label htmlFor="tipoEquipo" className={style.label}>Tipo de Equipo:</label>
          <input
            type="text"
            name="tipoEquipo"
            placeholder="Ingresa el tipo de equipo"
            value={newProduct.tipoEquipo}
            onChange={handleChange}
            required
            className={style.input}
          />

          <label htmlFor="departamento" className={style.label}>Departamento:</label>
          <input
            type="text"
            name="departamento"
            placeholder="Ingresa el departamento"
            value={newProduct.departamento}
            onChange={handleChange}
            required
            className={style.input}
          />

          <label htmlFor="fechaAsignacion" className={style.label}>Fecha de Asignación:</label>
          <input
            type="date"
            name="fechaAsignacion"
            value={newProduct.fechaAsignacion}
            onChange={handleChange}
            required
            className={style.input}
          />

          <label htmlFor="personaResponsable" className={style.label}>Persona Responsable:</label>
          <input
            type="text"
            name="personaResponsable"
            placeholder="Ingresa el nombre de la persona responsable"
            value={newProduct.personaResponsable}
            onChange={handleChange}
            required
            className={style.input}
          />

          <label htmlFor="fechaIngreso" className={style.label}>Fecha de Ingreso:</label>
          <input
            type="date"
            name="fechaIngreso"
            value={newProduct.fechaIngreso}
            onChange={handleChange}
            required
            className={style.input}
          />


          <button onClick={addProduct} className={style.button}>Agregar Producto</button>
        
          <button onClick={updateProduct} className={style.button}>Actualizar Producto</button>

          <input type="text" className={style.label} placeholder="ID del Producto a Actualizar" 
          value={updateId}
           
          onChange={(e) => setUpdateId(e.target.value)} />
       
        </form>

      </div>





      <hr />

  

      <h2>Listado de Productos</h2>
      <ul>
        {products.map(product => (
          <li key={product.codigoInventario}>
            ID: {product.codigoInventario} - Marca: {product.marca} - Tipo: {product.tipoEquipo} - Departamento: {product.departamento} - FechaAsignacion: {product.fechaAsignacion} - fecha ingreso: {product.fechaIngreso}
            <button onClick={() => deleteProduct(product.codigoInventario)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  )
}
