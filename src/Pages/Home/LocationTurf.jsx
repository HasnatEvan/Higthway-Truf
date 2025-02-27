const LocationTurf = () => {
    return (
        <div>
            <h2 className="text-2xl font-semibold text-center my-4">𝑶𝒖𝒓 𝑳𝒐𝒄𝒂𝒕𝒊𝒐𝒏</h2> {/* Title Added */}

            {/* Location Description */}
            <p className="text-center text-gray-700 text-sm md:text-base mb-4">
                Rowshanhat, opposite of BGC Trust, beside Global Islami Bank, Chandanaish, Chittogram
            </p>

            {/* Google Map */}
            <div className="w-full h-[200px] md:h-[300px] lg:h-[400px]">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d308.0876072870635!2d92.02011401943753!3d22.24464062981979!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30ad3d004f038285%3A0x87521c9ef6b04f3e!2sHighway%20Turf!5e0!3m2!1sen!2sbd!4v1740548785100!5m2!1sen!2sbd"
                    className="w-full h-full border-none"
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
            </div>
        </div>
    );
};

export default LocationTurf;