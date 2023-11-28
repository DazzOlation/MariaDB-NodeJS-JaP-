const mariadb = require("mariadb");
const pool = mariadb.createPool({
    host: "localhost",
    user: "root",
    password: "altapass",
    database: "salacine",
    connectionLimit: 5,
});

const getMovies = async ()=>{
    let conn;
    try {
        conn = await pool.getConnection();
        const rows = await conn.query(
        "SELECT id, nombre, año, genero, descripcion, cast FROM pelist"
        );
        return rows;
    } 
    catch (error) {
    } 
    finally {
        if (conn) conn.release();
    }
    return false;
};

const getMovieById = async (id)=>{
    let conn;
    try{
        conn = await pool.getConnection();
        const rows = await conn.query(
            "SELECT id, nombre, año, genero, descripcion, cast FROM pelist WHERE id=?", [id]
        );
        return rows[0];
    } catch(error){
        console.log(error);
    } finally{
        if(conn) conn.release();
    }
    return false;
};

const addMovie = async (movie)=>{
    let conn;
    try{
        conn = await pool.getConnection();
        const response = await conn.query(
            "INSERT INTO pelist(nombre, año, genero, descripcion, cast) VALUE(?, ?, ?, ?, ?)", 
            [movie.nombre, movie.año, movie.genero, movie.descripcion, movie.cast]
        );
        return {id: parseInt(response.insertId), ...movie}
    } catch(error){
        console.log(error);
    } finally{
        if(conn) conn.release();
    }
    return false;
};

const updateMovie = async (id, movie)=>{
    let conn;
    try{
        conn = await pool.getConnection();
        await conn.query(
            "UPDATE pelist SET nombre=?, año=?, genero=?, descripcion=?, cast=? WHERE id=?", 
            [movie.nombre, movie.año, movie.genero, movie.descripcion, movie.cast, id]
        );
        return {id, ...movie};
    } catch(error){
        console.log(error);
    } finally{
        if(conn) conn.release();
    }
    return false;
};

const deleteMovie = async (id)=>{
    let conn;
    try{
        conn = await pool.getConnection();
        const rows = await conn.query(
            "DELETE FROM pelist WHERE id=?", 
            [id]
        );
        return true;
    } catch(error){
        console.log(error);
    } finally{
        if(conn) conn.release();
    }
    return false;
};

module.exports = {
    getMovies,
    getMovieById,
    addMovie,
    updateMovie,
    deleteMovie,
};