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
      const response = await axios.get('http://localhost:61193/inventario/viewAll');
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products: ", error);
    }
  };

  // Agregar nuevo producto
  const addProduct = async (e) => {
    try {
      e.preventDefault();
      await axios.post('http://localhost:61193/inventario/newProducto', newProduct);
      alert("Producto añadido con éxito");
      fetchProducts();
    } catch (error) {
      console.error("Error adding product: ", error);
    }
  };

  // Actualizar producto
  const updateProduct = async (e) => {
    try {
      e.preventDefault();
      await axios.put(`http://localhost:61193/inventario/updateProducto/${updateId}`, newProduct);
      alert("Producto actualizado con éxito");
      fetchProducts(); // Refresh product list after updating
    } catch (error) {
      console.error("Error updating product: ", error);
    }
  };

  // Eliminar producto
  const deleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:61193/inventario/delete/${id}`);
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


<button type="submit" onClick={addProduct} className={style.button}>Agregar Producto</button>
<button type="submit" onClick={updateProduct} className={style.button}>Actualizar Producto</button>


          <label htmlFor="updateId" className={style.label}>ID del Producto a Actualizar:</label>
          <input
            type="text"
            id="updateId"
            name="updateId"
            placeholder="ID del Producto"
            value={updateId}
            onChange={(e) => setUpdateId(e.target.value)}
            className={style.input}
          />

        </form>

      </div>





      <hr />



      <h2>Listado de Productos</h2>
      <ul className={style.productList}>
        {products.map(product => (
          <li key={product.codigoInventario} className={style.productItem}>
            <div className={style.productInfo}>
              <p><strong>ID:</strong> {product.codigoInventario}</p>
              <p><strong>Marca:</strong> {product.marca}</p>
              <p><strong>Tipo:</strong> {product.tipoEquipo}</p>
              <p><strong>Departamento:</strong> {product.departamento}</p>
              <p><strong>Fecha Asignación:</strong> {product.fechaAsignacion}</p>
              <p><strong>Fecha Ingreso:</strong> {product.fechaIngreso}</p>
            </div>
            <button className={style.deleteButton} onClick={() => deleteProduct(product.codigoInventario)}>Eliminar</button>
          </li>
        ))}
      </ul>

    </div>
  )
}
