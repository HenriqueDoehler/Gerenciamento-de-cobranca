import './styles.css';
import "../modal.css";
import Success from '../../../images/icons/success.svg';

const EndChanges = () => {

    return (
        <div className='backdrop'>
            <div className='container-modal-edit back-modal check'>
                <img src={Success} alt='check' />
                <h2 className='sub-title'>Cadastro Alterado com sucesso!</h2>
            </div>
        </div>
    );
}

export default EndChanges;