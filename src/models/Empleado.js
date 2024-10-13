import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const empleadoSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

// Encriptar la contraseña antes de guardarla
empleadoSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

// Método para comparar contraseñas
empleadoSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

const Empleado = mongoose.model('Empleado', empleadoSchema);


export default Empleado;
