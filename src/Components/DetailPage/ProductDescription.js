import Button from 'Components/UI/Button/Button';
import { useState } from 'react';

// Hàm chuyển đổi thành dạng chuỗi
// và bổ sung <br /> và "- "
const brText = txt => {
  return String(txt).replace(/•|- /g, '<br />- ');
};

const ProductDescription = props => {
  // Trả về desc HTML string
  const descString = brText(props.desc);

  // State show/hide desc
  const [isShowDesc, setIsShowDesc] = useState(true);

  const viewDescBtnHandler = () => {
    setIsShowDesc(prevShow => !prevShow);
  };

  return (
    <div>
      <Button className="fs-6 mt-3 mb-3" onClick={viewDescBtnHandler}>
        DESCRIPTION
      </Button>
      {isShowDesc && (
        <div>
          <h6 className="mt-3 mb-4">PRODUCT DESCRIPTION</h6>
          {props.desc && (
            <div
              className="text-secondary lh-lg"
              // Hàm chuyển đổi "HTML string" as 'real HTML' in react component
              dangerouslySetInnerHTML={{ __html: descString }}
            />
          )}
          {!props.desc && (
            <p className="text-secondary">- Chưa có thông tin chi tiết.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductDescription;
