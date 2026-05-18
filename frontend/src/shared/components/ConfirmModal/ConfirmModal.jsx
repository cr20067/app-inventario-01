import "./ConfirmModal.css";

function ConfirmModal({ visible, title, message, onConfirm, onCancel }) {

  if (!visible) return null;

  return (

    <div className="modal-overlay">

      <div className="confirm-modal">

        <h2>{title}</h2>

        <p>{message}</p>

        <div className="modal-actions">

          <button
            className="cancel-btn"
            onClick={onCancel}
          >
            Cancelar
          </button>

          <button
            className="confirm-btn"
            onClick={onConfirm}
          >
            Eliminar
          </button>

        </div>

      </div>

    </div>
  );
}

export default ConfirmModal;