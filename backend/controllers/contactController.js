import Contact from "../models/Contact.js";

export const submitContactForm = async (req, res) => {
  const { name, email, subject, message } = req.body;

  try {
    const contact = new Contact({ name, email, subject, message });
    await contact.save();
    res.status(201).json({ message: "Message received successfully!" });
  } catch (error) {
    console.error("Error saving contact form:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
