
import React, { useState, useEffect, useRef } from "react";
import { useMutation } from "react-apollo";
import ReCAPTCHA from "react-google-recaptcha";
import saveDocument from "./../react/graphql/saveDocument.graphql";
import fileUpload from "./../react/graphql/fileUpload.graphql";

interface CustomFormProps {
  name: string;
  email: string;
  subject: string;
  message: string;
  file: any;
}

const CustomForm: StorefrontFunctionComponent = () => {
  const [save] = useMutation(saveDocument);
  const [file, setFile] = useState(null);
  const [uploadfile] = useMutation(fileUpload);
  const [recaptchaToken, setRecaptchaToken] = useState("");
  const [sitecapKey, setSiteKey] = useState("");
  const captchaRef = useRef(null);
  const [message, setMessage] = useState("");  
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState<CustomFormProps>({
    name: "",
    email: "",
    subject: "",
    message: "",
    file: null,
  });

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target as any;
    setFormData((prevProps) => ({
      ...prevProps,
      [name]: value,
    }));
  };

  const handleRecaptchaChange = (captchaString: string | null) => {
    if (captchaString) {
      setRecaptchaToken(captchaString);
      setError(false);
    }
  };

  const fetchCaptcha = async () => {
    const data = await fetch("/v1/captcha");
    if (data.ok) {
      const response = await data.json();
      if (response.siteKey) setSiteKey(response.siteKey);
    }
  };

  useEffect(() => {
    fetchCaptcha();
  }, []);

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { files } = event.target as any;
    const { data } = await uploadfile({
      variables: { file: files[0] },
    });

    setFormData({
      ...formData,
      file: data.uploadFile.fileUrl,
    });
    setFile(data.uploadFile.fileUrl);
  };

  const formSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    if (!recaptchaToken) {
      setError(true);
      setMessage("Please verify the reCAPTCHA");
      setLoading(false);
      return;
    }

    try {
      const savedData = await save({
        variables: {
          dataEntity: "JP",
          document: { document: { ...formData } },
          schema: "contactSchema",
        },
      });
      if (savedData) {
        setSuccess(true);
        setLoading(false);
        setMessage("Form saved successfully");
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
          file: null,
        });
        setFile(null);
        setTimeout(() => {
          setSuccess(false);
        }, 3000);
      }
    } catch (error) {
      console.error("Error:", error);
      setLoading(false);
      setError(true);
      setMessage(error);
    }
  };

  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: "20px",
        borderRadius: "10px",
        width: "400px",
        margin: "auto",
        textAlign: "center",
      }}
    >
      <main className="pa4 black-80">
        <form onSubmit={formSubmit}>
          <h1
            className="f2 mb4"
            style={{
              fontFamily: "sans-serif",
              fontSize: "2rem",
              fontWeight: "bold",
              textAlign: "left",
            }}
          >
            Signup
          </h1>

          <fieldset >
            <div className="mt3" style={{ textAlign: "left" }}>
              <label
                className="db fw6 lh-copy f6"
                htmlFor="name"
                style={{
                  marginBottom: "0.5em",
                }}
              >
                Name
              </label>
              <input
                className="pa2 input-reset ba bg-transparent hover-bg-black hover-black w-100 br2"
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={handleChange}
                required
                style={{
                  border: "1px solid #ccc",
                  padding: "0.5em",
                }}
              />
            </div>

            <div className="mt3" style={{ textAlign: "left" }}>
              <label
                className="db fw6 lh-copy f6"
                htmlFor="email-address"
                style={{
                  marginBottom: "0.5em",
                }}
              >
                Email
              </label>
              <input
                className="pa2 input-reset ba bg-transparent hover-bg-black hover-black w-100 br2"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                id="email-address"
                required
                style={{
                  border: "1px solid #ccc",
                  padding: "0.5em",
                }}
              />
            </div>

            <div className="mv3" style={{ textAlign: "left" }}>
              <label
                className="db fw6 lh-copy f6"
                htmlFor="subject"
                style={{
                  marginBottom: "0.5em",
                }}
              >
                Subject
              </label>
              <input
                className="pa2 input-reset ba bg-transparent hover-bg-black hover-black w-100 br2"
                type="text"
                value={formData.subject}
                onChange={handleChange}
                name="subject"
                id="subject"
                required
                style={{
                  border: "1px solid #ccc",
                  padding: "0.5em",
                }}
              />
            </div>

            <div style={{ textAlign: "left" }}>
              <label
                className="f6 b db mb2"
                htmlFor="message"
                style={{
                  marginBottom: "0.5em",
                }}
              >
                Comments
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="db border-box hover-black w-100 measure ba b--black-20 pa2 br2 mb2"
                aria-describedby="comment-desc"
                required
                style={{
                  border: "1px solid #ccc",
                  padding: "0.5em",
                }}
              ></textarea>
            </div>

            <div className="mt5" style={{ textAlign: "left" }}>
              <label className="f6 b db mb2">Upload File:</label>
              <input
                type="file"
                className="input-reset ba b--black-20 pa2 mb2 db w-full measure"
                id="fileInput"
                name="fileInput"
                onChange={(e) => {
                  handleFileUpload(e);
                }}
                required
              />
              {file && <p>Selected file: {file}</p>}
            </div>

            {sitecapKey && (
              <div className="mt5" style={{ textAlign: "left" }}>
                <label className="f6 b db mb2">Recaptcha</label>
                <ReCAPTCHA
                  sitekey={sitecapKey}
                  ref={captchaRef}
                  onChange={(e) => {
                    handleRecaptchaChange(e);
                  }}
                />
              </div>
            )}
          </fieldset>

          {loading && (
            <div className="spinner-border text-primary" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          )}
          {success && <div className="ba bw2 b--blue">{message}</div>}
          {error && !success && (
            <div className="ba bw2 b--blue">{message}</div>
          )}

          <div className="mt3">
            <input
              className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib br2"
              type="submit"
              value="Submit"
              style={{
                border: "1px solid #0074cc",
                background: "#0074cc",
                color: "#fff",
                cursor: "pointer",
              }}
            />
          </div>
        </form>
      </main>
    </div>
  );
};

export default CustomForm;
