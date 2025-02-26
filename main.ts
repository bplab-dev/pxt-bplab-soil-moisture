/**
 * Soil Moisture Sensor with LM393
 */
//% color=#3eb0e0 icon="\uf043" block="Soil Moisture" weight=1
namespace soilMoisture {
    /**
     * Soil moisture value type
     */
    export enum ValueType {
        //% block="Analog Value(0~1023)"
        RAW = 0,
        //% block="Percentage Value(0~100%)"
        PERCENTAGE = 1
    }

    /**
     * Soil moisture pin
     */
    export enum SoilMoisturePin {
        //% block="P0"
        P0 = AnalogPin.P0,
        //% block="P1"
        P1 = AnalogPin.P1,
        //% block="P2"
        P2 = AnalogPin.P2,
        //% block="P3"
        P3 = AnalogPin.P3,
        //% block="P4"
        P4 = AnalogPin.P4,
        //% block="P10"
        P10 = AnalogPin.P10
    }

    /**
     * Get soil moisture sensor value
     * @param pin Analog pin connected to sensor
     * @param valueType Select raw value or percentage
     */
    //% blockId="readSoilMoisture" block="Soil moisture pin %pin %valueType"
    //% tooltip="Reads the soil moisture level from sensor connected to the specified analog pin"
    //% pin.fieldEditor="gridpicker"
    export function soilMoistureValue(pin: SoilMoisturePin, valueType: ValueType): number {
        // Read analog value
        let moisture = pins.analogReadPin(pin)

        // Ensure the reading is within valid range
        moisture = Math.constrain(moisture, 0, 1023)

        switch (valueType) {
            case ValueType.RAW:
                return moisture
            case ValueType.PERCENTAGE:
                // Convert to percentage (inverted as more moisture = lower resistance)
                // Typically: Dry soil > 800, Water ~ 300
                return Math.map(moisture, 1023, 300, 0, 100)
            default:
                return 0
        }
    }
}
