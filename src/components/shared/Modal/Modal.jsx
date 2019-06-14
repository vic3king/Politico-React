import React from 'react';
import PropTypes from 'prop-types';
import '../../../style/modal.scss';

const Modal = ({
  InputOne,
  InputTwo,
  Select,
  Header,
  SpanOne,
  SpanTwo,
  SpanThree,
  SpanFour,
  InputThree,
  ButtonOne,
  CloseModal,
}) => {
  return (
    <div>
      <section className="modal-main">
        <form className="modal-form">
          {Header}
          <div className="fix">
            {SpanOne}
            {Select}
          </div>
          <div className="fix">
            {SpanTwo}
            {InputOne}
          </div>
          <div className="fix">
            {SpanThree}
            {InputTwo}
          </div>
          <div className="fix">
            {SpanFour}
            {InputThree}
          </div>
          {ButtonOne}
          {CloseModal}
        </form>
      </section>
    </div>
  );
};

Modal.defaultProps = {
  InputOne: (PropTypes.defaultProps = ''),
  InputTwo: (PropTypes.defaultProps = ''),
  Select: (PropTypes.defaultProps = ''),
  Header: (PropTypes.defaultProps = ''),
  SpanOne: (PropTypes.defaultProps = ''),
  SpanTwo: (PropTypes.defaultProps = ''),
  SpanThree: (PropTypes.defaultProps = ''),
  ButtonOne: (PropTypes.defaultProps = ''),
  SpanFour: (PropTypes.defaultProps = ''),
  InputThree: (PropTypes.defaultProps = ''),
};
Modal.propTypes = {
  InputOne: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  InputTwo: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  Select: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  Header: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  SpanOne: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  SpanTwo: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  SpanThree: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  ButtonOne: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  InputThree: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  SpanFour: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
};
export default Modal;
