"use client";

import Modal from "@/components/Modal";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import ChangePaymentMethod from "./change-payment-option";
import ModifyCardModal from "./modify-card-modal";
import {
  handledeletePromptChange,
  handledeleteSuccessChange,
  handlerevertPromptChange,
  handlerevertSuccessChange,
  setAddCard,
  setDeletePrompt,
  setDeleteSuccess,
  setRevertPrompt,
  setRevertSuccess,
} from "@/redux/features/subscriptionSlice";

const Modals = () => {
  const {
    deletePrompt,
    deleteSuccess,
    addCard,
    revertPrompt,
    revertSuccess,
    modifyCard,
    changePayment,
  } = useAppSelector((state) => state.subscription);
  const dispatch = useAppDispatch();

  return (
    <div>
      <Modal
        title="ARE YOU SURE?"
        content={
          <div>
            <h6 className=" font-bold text-xl">DELETE CARD?</h6>
            <p>
              When you delete this card, it can no longer be used to accept
              payment from your account
            </p>
          </div>
        }
        headerTextColor="#A71C1C"
        // isPending={isOtpPending}
        isPendingText="DELETING"
        open={deletePrompt}
        setOpen={() => dispatch(handledeletePromptChange())}
        cancelButton="CANCEL"
        primaryButton="DELETE"
        primaryButtonAction={() => {
          dispatch(setDeletePrompt(false));
          dispatch(setDeleteSuccess(true));
        }}
      />
      <Modal
        title="Action Successful"
        content={
          <div>
            <h6 className=" font-bold text-xl">CARD DELETED</h6>
            <p>
              Your payment option ha been deleted from your account. You can add
              new by clicking the “Add New” button below.
            </p>
          </div>
        }
        // isPending={isOtpPending}
        // isPendingText="DELETING"
        open={deleteSuccess}
        setOpen={() => dispatch(handledeleteSuccessChange())}
        cancelButton="CLOSE"
        primaryButton="ADD NEW"
        primaryButtonAction={() => {
          dispatch(setDeleteSuccess(false));
          dispatch(setAddCard(true));
        }}
      />
      <Modal
        title="ARE YOU SURE?"
        content={
          <div>
            <h6 className=" font-bold text-xl">REVERT TO DEFAULT?</h6>
            <p>
              The default payment method set by the company is a “Wire
              Transfer”. Reverting to this means you want your subscription
              verifcatin method to be manual.{" "}
            </p>
          </div>
        }
        headerTextColor="#A71C1C"
        // isPending={isOtpPending}
        isPendingText="PROCESSING"
        open={revertPrompt}
        setOpen={() => dispatch(handlerevertPromptChange())}
        cancelButton="CANCEL"
        primaryButton="CONTINUE"
        primaryButtonAction={() => {
          dispatch(setRevertPrompt(false));
          dispatch(setRevertSuccess(true));
        }}
      />
      <Modal
        title="Action Successful"
        content={
          <div>
            <h6 className=" font-bold text-xl">PAYMENT METHOD REVERTED</h6>
            <p>
              You will now have to manually send in your subscription manually
              via a bank transfer and the verification will also be done
              manually which could lead to some delays.
            </p>
          </div>
        }
        // isPending={isOtpPending}
        isPendingText="DELETING"
        open={revertSuccess}
        setOpen={() => dispatch(handlerevertSuccessChange())}
        cancelButton="CLOSE"
        // primaryButton="DELETE"
        // primaryButtonAction={() => {
        //   setRevertPrompt(false);
        // }}
      />
      <ChangePaymentMethod />
      <ModifyCardModal />
    </div>
  );
};

export default Modals;
