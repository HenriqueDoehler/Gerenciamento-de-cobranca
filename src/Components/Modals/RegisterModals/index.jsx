import { Box, Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useGlobalContextProvider from "../../../hooks/useGlobalContextProvider";
import Client from '../../../images/icons/client.svg';
import Close from '../../../images/icons/close.svg';
import api from '../../../services/api';
import '../../Modals/modal.css';
import './styles.css';

const RegisterModals = ({ setAddClientes, closeModal }) => {
    const navigate = useNavigate()
    const [formActive, setFormActive] = useState(false);
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [cep, setCep] = useState('');
    const [phone, setPhone] = useState('');
    const [cpf, setCpf] = useState('');
    const [adress, setAdress] = useState('');
    const [district, setDistrict] = useState('');
    const [city, setCity] = useState('');
    const [uf, setUf] = useState('');
    const [complemento, setComplemento] = useState('');
    const { token } = useGlobalContextProvider();

    async function HandleSubmit(e) {
        e.preventDefault();
        try {
            if (!email || !name) {
                setFormActive(true)
                return;
            }
            const response = await api.post("/cliente", {

                nome: name,
                email: email,
                cpf: cpf,
                telefone: phone,
                logradouro: adress,
                complemento: complemento,
                cep: cep,
                bairro: district,
                cidade: city,
                estado: uf


            },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })


            if (response.status > 202) {
                return;
            }
            console.log(response)
            closeModal()
            navigate("/clients");

        } catch (error) {

            console.log(error)
        }
    }

    return (
        <div className='backdrop'>
            <div className='container-modal-edit back-modal'>
                <div className='close'>
                    <img
                        onClick={() => { setAddClientes(false) }}
                        src={Close} alt='close' />
                </div>
                <div className='client-img'>
                    <img className='client-add-icon' src={Client} alt='client' />
                    <h1 className='title'>Cadastro do Cliente</h1>
                </div>
                <Box

                    component="form"
                    sx={{
                        '& > :not(style)': { m: '3px', width: '380px' },
                    }}
                    noValidate
                    autoComplete="on"
                >
                    <h3 className='label'>Nome*</h3>
                    {
                        !formActive
                            ? <TextField id="filled-basic"
                                size='small'
                                label="Digite seu nome"
                                variant="outlined"
                                value={name}
                                onChange={e => { setName(e.target.value) }}
                            />
                            :
                            <TextField
                                className='erro-cadastro-cliente'
                                size='small'
                                error
                                id="filled-error-helper-text"
                                label="Digite o nome"
                                value={name}
                                onChange={e => { setName(e.target.value) }}
                                helperText="Este campo deve ser preenchido"
                                variant="outlined"
                            />
                    }
                    <h3 className='label'>Email*</h3>
                    {
                        !formActive
                            ? <TextField id="filled-basic"
                                size='small'
                                label="Digite seu e-mail"
                                variant="outlined"
                                value={email}
                                onChange={e => { setEmail(e.target.value) }}
                            />
                            :
                            <TextField
                                size='small'
                                error
                                id="filled-error-helper-text"
                                label="Digite o e-mail"
                                value={email}
                                onChange={e => { setEmail(e.target.value) }}
                                helperText="E-mail já cadastrado"
                                variant="outlined"
                            />
                    }
                    <div className='inputs-div'>
                        <div className='div-input'>
                            <h3 className='label'>CPF*</h3>
                            {
                                !formActive
                                    ? <TextField id="filled-basic"
                                        size='small'
                                        label="Digite seu CPF"
                                        variant="outlined"
                                        value={cpf}
                                        onChange={e => { setCpf(e.target.value) }}
                                    />
                                    :
                                    <TextField
                                        className='cpf'
                                        size='small'
                                        error
                                        id="filled-error-helper-text"
                                        label="Digite seu CPF"
                                        value={cpf}
                                        onChange={e => { setCpf(e.target.value) }}
                                        helperText="CPF já cadastrado"
                                        variant="outlined"
                                    />
                            }
                        </div>
                        <div>
                            <h3 className='label'>Telefone*</h3>
                            {
                                !formActive
                                    ? <TextField id="filled-basic"
                                        size='small'
                                        label="Digite seu Telefone"
                                        variant="outlined"
                                        value={phone}
                                        onChange={e => { setPhone(e.target.value) }}
                                    />
                                    :
                                    <TextField
                                        size='small'
                                        error
                                        id="filled-error-helper-text"
                                        label="Digite seu Telefone"
                                        value={phone}
                                        onChange={e => { setPhone(e.target.value) }}
                                        helperText="Este campo deve ser preenchido"
                                        variant="outlined"
                                        style={{ marginBottom: '50px' }}
                                    />
                            }
                        </div>
                    </div>
                    <h3 className='label label-end'>Endereço</h3>

                    <TextField id="filled-basic"
                        size='small'
                        label="Digite o endereço"
                        variant="outlined"
                        value={adress}
                        onChange={e => { setAdress(e.target.value) }}
                    />
                    <h3 className='label'>Complemento</h3>
                    <TextField id="filled-basic"
                        size='small'
                        label="Digite o complemento"
                        variant="outlined"
                        value={complemento}
                        onChange={e => { setComplemento(e.target.value) }}
                    />
                    <div className='inputs-div input-cep'>
                        <div className='div-input'>
                            <h3 className='label'>CEP</h3>
                            <TextField id="filled-basic"
                                size='small'
                                label="Digite o CEP"
                                variant="outlined"
                                value={cep}
                                onChange={e => { setCep(e.target.value) }}
                            />
                        </div>
                        <div>
                            <h3 className='label'>Bairro</h3>
                            <TextField id="filled-basic"
                                size='small'
                                label="Digite o bairro"
                                variant="outlined"
                                value={district}
                                onChange={e => { setDistrict(e.target.value) }}
                            />
                        </div>
                    </div>
                    <div className='inputs-div'>
                        <div className='div-input input-cidade'>
                            <h3 className='label'>Cidade</h3>
                            <TextField id="filled-basic"
                                size='small'
                                label="Digite a cidade"
                                variant="outlined"
                                value={city}
                                onChange={e => { setCity(e.target.value) }}
                            />
                        </div>
                        <div className='input-uf'>
                            <h3 className='label'>UF</h3>
                            <TextField id="filled-basic"
                                size='small'
                                label="Digite a UF"
                                variant="outlined"
                                value={uf}
                                onChange={e => { setUf(e.target.value) }}
                            />
                        </div>
                    </div>

                    <br />
                    <div className='div-btn'>
                        <Button
                            className='btn-cancelar'
                            variant="contained"
                            color='success'
                            type='submit'
                            rounded
                        >
                            Cancelar
                        </Button>

                        <Button
                            className='btn-aplicar'
                            variant="contained"
                            color='success'
                            type='submit'
                            rounded
                            onClick={HandleSubmit}
                        >
                            Aplicar
                        </Button>
                    </div>
                </Box>
            </div >
        </div >
    );
}

export default RegisterModals;